import axios from "axios";
import alertify from "alertifyjs/build/alertify";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css";

const base_url ="http://localhost:8000";
const emp_base_url = "http://localhost:8000/emp"

export const GetIndexService = async (url) => {
  return axios(base_url + url, {
    method: "GET",
    headers: {
      "content-type": "application/json", // whatever you want
    },
  }).then(
    (res) => {
      return res;
    })
    .catch((err) => {
        console.log("Server responsed with an error: " + err)
        return err;
    })
};

export const LoginService = async(url, data) => {
  return await axios(base_url + url, {
    method: "POST",
    headers: {
      "content-type": "application/json", // whatever you want
    },
    data: data,
  }).then(
    (res) => {
      return res;
    })
    .catch((err) => {
        console.log("Server responsed with an error: " + err)
        return err;
    })
};

export const RegisterService = async(url, data) => {
    return await axios(base_url + url, {
      method: "POST",
      headers: {
        "content-type": "application/json", // whatever you want
      },
      data: data,
    }).then(
      (res) => {
        return res;
      }
    ).catch((err) => {
        console.log("Server responsed with an error: " + err)
        return err;
    })
};

export const AddEmployeeService = async(url, data) => {
    return await axios(emp_base_url + url, {
      method: "POST",
      headers: {
        "content-type": "application/json", // whatever you want
      },
      data: data,
    }).then(
      (res) => {
        return res;
      }
    ).catch((err) => {
        console.log("Server responsed with an error: " + err)
        return err
    })
};

export const GetEmployeeList = async (url) => {
    return axios(emp_base_url + url, {
      method: "GET",
      headers: {
        "content-type": "application/json", // whatever you want
      },
    }).then(
      (res) => {
        return res;
      })
      .catch((err) => {
          console.log("Server responsed with an error: " + err)
          return err;
      })
  };

export const DeleteEmployeeService= async (url) => {
        return axios(emp_base_url + url, {
            method: "DELETE",
            headers: {
            "content-type": "application/json", // whatever you want
            },
        }).then(
            (res) => {
            return res;
            })
            .catch((err) => {
                console.log("Error occured delete employee from server");
                return err;
            })
};

export const UpdateEmployeeService=async (url, data)=>{

  return axios(emp_base_url + url, {
    method: "PUT",
    headers: {
      "content-type": "application/json", // whatever you want
    },
    data: data,
  }).then(
    (res) => {
      return res;
    })
    .catch((err) =>{
        console.log("Error occured in the update function in server")
        return err
    })

}