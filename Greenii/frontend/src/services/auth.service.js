import axios from "axios";
import qs from "qs";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        console.log("user signed in");
        if (response.data.accessToken) {
          console.log(response);
          if (response.data.roles[0] === "ROLE_USER") {
            console.log("user role");
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("role", "user");
          } else if (response.data.roles[0] === "ROLE_DRIVER") {
            localStorage.setItem("driver", JSON.stringify(response.data));
            localStorage.setItem("role", "driver");
          }
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("driver");
  }

  driverRegister(username, email, password, role, phone) {
    console.log(username, email, password, role, phone);
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      role,
      phone,
    });
  }

  userRegister(username, email, password, role) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      role,
    });
  }

  order(formData) {
    console.log("yeeeeeeeeeeeeeeeeee");
    console.log(formData.get("senderName"));
    console.log(formData.get("senderPhonenumber"));
    console.log(formData.get("senderAddress"));
    console.log(formData.get("receiverName"));
    console.log(formData.get("receiverPhonenumber"));
    console.log(formData.get("receiverAddress"));
    console.log(formData.get("productType"));
    console.log(formData.get("productWeight"));
    console.log(formData.get("startDate"));
    console.log(formData.get("startTime"));
    console.log(formData.get("returnLabel"));
    console.log("asdasdadasdadas");

    return axios({
      method: "POST",
      url: API_URL + "orders/create",
      contentType: "application/json",
      data: formData,
    });

    // return axios.post(API_URL + "orders/create",{
    //   formData
    // })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getCurrentDriver() {
    return JSON.parse(localStorage.getItem("driver"));
  }

  getCurrentRole() {
    return localStorage.getItem("role");
  }

  getOrderList() {
    const userID = this.getCurrentUser().id;
    // return axios({
    //   method: 'GET',
    //   url: API_URL + 'orders/create',
    //   contentType: "application/json",
    //   data: formData
    // }
    return axios({
      method: "GET",
      url: API_URL + "orders/getAll",
      contentType: "application/json",
      params: {
        userid: userID,
      },
    });
    // return axios.get(API_URL + 'getAll',userID);
  }

  getOrderDetails(orderID) {
    // let formData = new FormData()
    // formData.append('id',5)

    return axios({
      method: "GET",
      url: API_URL + "orders/getOrder",
      contentType: "application/json",
      params: {
        id: orderID,
      },
    });
  }

  getWaitingOrder() {
    return axios({
      method: "GET",
      url: API_URL + "orders/getWaitingOrder",
      contentType: "application/json",
      // params:{
      //
      // }
    });
    // return axios.get(API_URL + 'getAll',userID);
  }

  getDriverOrders() {
    const driverID = this.getCurrentDriver().id;
    return axios({
      method: "GET",
      url: API_URL + "orders/getDriverOrders",
      contentType: "application/json",
      params: {
        id: driverID,
      },
    });
  }

  acceptOrder(orderID) {
    const driverID = this.getCurrentDriver().id;
    console.log(orderID, driverID);
    const id = parseInt(orderID);
    return axios.put(API_URL + "orders/acceptOrder", {
      id,
      driverID,
    });
    // return axios({
    //   method: 'PUT',
    //   url: API_URL + 'orders/acceptOrder',
    //   contentType: "application/json",
    //   params:{
    //     orderID,
    //     driverID
    //   }
    // })
  }

  updateProcess(orderID, process) {
    process = process + 1;
    console.log(orderID, process);
    const id = parseInt(orderID);
    return axios.put(API_URL + "orders/updateOrder", {
      id,
      process,
    });
  }
}

export default new AuthService();
