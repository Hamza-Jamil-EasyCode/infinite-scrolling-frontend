import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { printErrorMessage } from "../helper/helper";
import { addNewUser, getUser, updateUser } from "../../utils/userApis";
import { AddressModel, UsersModel } from "../../models/userModel";
import Spacer from "../common/Spacer";
import { AxiosResponse } from "axios";

type Props = {};

const UserForm = (props: Props) => {
  const { userID, isView } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(isView ? true : false);
  const [user, setUser] = useState<UsersModel>(Object());
  const [address, setAddress] = useState<AddressModel>(Object());
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const updateTheUser = async () => await updateUser(String(userID), user);

  const addThisNewUser = async () => await addNewUser(user);

  const _submit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const resp: AxiosResponse = userID
        ? await updateTheUser()
        : await addThisNewUser();

      toast.success(resp.data.message);
      navigate("/users");
    } catch (error) {
      toast.error(printErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const resp = await getUser(userID!);

      setUser(resp.data.data);
      setAddress(resp.data.data?.address);
    } catch (error) {
      toast.error(printErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const onChangeHandlerAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const newAddress = { ...address, [name]: value };
    setAddress(newAddress);
    setUser({ ...user, ["address"]: newAddress });
  };

  const isEditable = (): boolean => (isView === "true" ? true : false);

  useEffect(() => {
    if (userID) fetchInitialData();
  }, []);

  return (
    <div className="user_form">
      <form onSubmit={_submit}>
        <div className="row">
          <div className="col-md-6">
            <div className="inputField">
              <label htmlFor="name">User name</label>
              <div>
                <input
                  name="name"
                  id="name"
                  type="name"
                  aria-label="name"
                  onChange={onChangeHandler}
                  value={user?.name}
                  required
                  disabled={isEditable()}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="inputField">
              <label htmlFor="email">Email</label>
              <div>
                <input
                  name="email"
                  id="email"
                  type="email"
                  aria-label="email"
                  onChange={onChangeHandler}
                  value={user?.email}
                  required
                  disabled={isEditable()}
                />
              </div>
            </div>
          </div>
        </div>
        <Spacer />
        <div className="row">
          <div className="col-md-6">
            <div className="inputField">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div>
                <input
                  name="phoneNumber"
                  id="phoneNumber"
                  type="number"
                  aria-label="phoneNumber"
                  onChange={onChangeHandler}
                  value={user?.phoneNumber}
                  required
                  disabled={isEditable()}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="inputField">
              <label htmlFor="role">Role</label>
              <div>
                <select
                  id="role"
                  name="role"
                  onChange={onChangeHandler}
                  value={user.role}
                  required
                  disabled={isEditable()}
                >
                  <option value="">Select role</option>
                  <option value="internee">Internee</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <Spacer />

        <div className="row">
          <div className="col-md-6">
            <div className="inputField">
              <label htmlFor="addressLine1">Address Line 1</label>
              <div>
                <input
                  name="addressLine1"
                  id="addressLine1"
                  type="text"
                  aria-label="addressLine1"
                  onChange={onChangeHandlerAddress}
                  value={user?.address?.addressLine1}
                  required
                  disabled={isEditable()}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="inputField">
              <label htmlFor="addressLine2">Address Line 2</label>
              <div>
                <input
                  name="addressLine2"
                  id="addressLine2"
                  type="text"
                  aria-label="addressLine2"
                  onChange={onChangeHandlerAddress}
                  value={user?.address?.addressLine2}
                  required
                  disabled={isEditable()}
                />
              </div>
            </div>
          </div>
        </div>
        <Spacer />

        <div className="row">
          <div className="col-md-4">
            <div className="inputField">
              <label htmlFor="city">City</label>
              <div>
                <input
                  name="city"
                  id="city"
                  type="text"
                  aria-label="city"
                  onChange={onChangeHandlerAddress}
                  value={user?.address?.city}
                  required
                  disabled={isEditable()}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="inputField">
              <label htmlFor="state">State</label>
              <div>
                <input
                  name="state"
                  id="state"
                  type="text"
                  aria-label="state"
                  onChange={onChangeHandlerAddress}
                  value={user?.address?.state}
                  required
                  disabled={isEditable()}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="inputField">
              <label htmlFor="country">Country</label>
              <div>
                <input
                  name="country"
                  id="country"
                  type="text"
                  aria-label="country"
                  onChange={onChangeHandlerAddress}
                  value={user?.address?.country}
                  required
                  disabled={isEditable()}
                />
              </div>
            </div>
          </div>
        </div>
        <Spacer />

        {!isEditable() && (
          <div className="submitBtn">
            <button type="submit" disabled={loading}>
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : userID ? (
                "Update User"
              ) : (
                "Add User"
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;
