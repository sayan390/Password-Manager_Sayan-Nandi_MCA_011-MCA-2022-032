import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", Username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray = JSON.parse(passwords);
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
   
    setPasswordArray([...passwordArray,{...form, id: uuidv4()}]);
    localStorage.setItem("password", JSON.stringify([...passwordArray,{...form, id: uuidv4()}]));
    console.log([...passwordArray, form]);
    setform({site:"", username:"", password: ""})
    toast("Password Saved Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
 
  }

  const deletePassword = (id) => {
    console.log("Deleting password with id", id)
    let c= confirm("Do you really want to delete this password ?")
    if(c){
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    toast("Password Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    }
  };

  const editPassword = (id) => {
     
    
    console.log("Editing password with id", id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    
  
  };
  const handalChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>
      </div>

      <div className=" p-2 md:p-0 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handalChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handalChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handalChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-0 curser-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={40}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 rounded-full px-8 py-2 w-fit border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="flex items-center justify-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>

                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white text-center">
                        <span className='cursor-pointer mx-1'onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wvdxdmpi.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
