import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { UsersModel } from "../../models/userModel";
import { toast } from "react-hot-toast";
import { printErrorMessage } from "../helper/helper";
import { getAllUsersWithDetails, isActivateUser } from "../../utils/userApis";

type Props = {};

const UserListing = (props: Props) => {
  const navigate = useNavigate();

  const observer = useRef<any>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersModel[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [limit, setLimit] = useState<number>(1000);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const fetchMoreData = async (pageNumber: number, limit: number) => {
    setIsLoadMore(true);
    try {
      const resp = await getAllUsersWithDetails(pageNumber, limit);
      //   debugger;
      if (!resp.data.data.length) return;

      //   debugger;
      const [...rest] = users;
      const allUsers = [...rest, ...resp.data.data];

      setUsers(allUsers);
      setPageNumber(allUsers.length + 1);

      //   debugger;
      if (allUsers.length + 1 >= resp.data.total) setIsEnd(true);
    } catch (error) {
      toast.error(printErrorMessage(error));
    } finally {
      setIsLoadMore(false);
    }
  };

  const lastUserRef = useCallback(
    (node: any) => {
      // debugger

      if (isLoadMore) return;

      // debugger
      if (observer?.current) observer?.current?.disconnect();

      // debugger
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && !isEnd) {
          await fetchMoreData(pageNumber, limit);
        }
      });

      // debugger
      if (node) observer.current.observe(node);
    },
    [isLoadMore, isEnd]
  );

  const fetchInitialData = async (pageNumber: number, limit: number) => {
    setLoading(true);
    try {
      // debugger
      const resp = await getAllUsersWithDetails(pageNumber, limit);

      if (!resp.data.data.length) return;

      // debugger
      setUsers(resp.data.data);
      setPageNumber(resp.data.data.length + 1);

      // debugger
      if (resp.data.total === resp.data.data) setIsEnd(true);
    } catch (error) {
      toast.error(printErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const addUser = () => navigate("/users/new");
  const editUser = (id: string) => navigate(`/user/edit/${id}/${false}`);

  const deleteUser = async (id: string) => {
    alert("You want to delete this user");

    try {
      const [...rest] = users;

      const userIndex = rest.findIndex((e: UsersModel) => e._id === id);
      // debugger;
      rest[userIndex].isActive = !rest[userIndex].isActive;

      // debugger;
      const resp = await isActivateUser(id, rest[userIndex].isActive!);

      // debugger;
      setUsers((prev) => [...rest]);
      toast.success(resp.data.message);
    } catch (error) {
      toast.error(printErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchInitialData(pageNumber, limit);
  }, []);

  const renderLoader = () => (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  const renderTable = useMemo(
    () => (
      <table>
        <thead>
          <tr>
            <td>#</td>
            <td>Email</td>
            <td>name</td>
            <td>role</td>
            <td>isActive</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((e: UsersModel, i) => {
            if (i === users.length - 1) {
              return (
                <tr key={e._id} ref={lastUserRef}>
                  <td>{i + 1}</td>
                  <td>{e.email}</td>
                  <td>{e.name}</td>
                  <td>{e.role}</td>
                  <td className={e.isActive ? "" : "inactive"}>
                    {String(e.isActive)}
                  </td>
                  <td className="action">
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => editUser(e?._id!)}
                    />
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteUser(e?._id!)}
                    />
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => navigate(`/user/edit/${e._id}/${true}`)}
                    />
                  </td>
                </tr>
              );
            }

            return (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{e.email}</td>
                <td>{e.name}</td>
                <td>{e.role}</td>
                <td className={e.isActive ? "" : "inactive"}>
                  {String(e.isActive)}
                </td>
                <td className="action">
                  <i
                    title="edit user"
                    className="fa-solid fa-edit"
                    onClick={() => editUser(e?._id!)}
                  />
                  <i
                    title="delete user"
                    className="fa-solid fa-trash"
                    onClick={() => deleteUser(e?._id!)}
                  />
                  <i
                    title="view user"
                    className="fa-solid fa-eye"
                    onClick={() => navigate(`/user/edit/${e._id}/${true}`)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ),
    [users]
  );

  return loading ? (
    renderLoader()
  ) : (
    <div className="user_listing">
      <div className="user_listing-addUser">
        <button onClick={addUser}>Add User</button>
      </div>

      <div className="data">
        {renderTable}
        {isLoadMore && renderLoader()}
        {isEnd && (
          <div className="no-load">
            <h1> No more users to load</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListing;
