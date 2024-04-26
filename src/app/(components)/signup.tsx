"use client";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  borderRadius: 3,
  boxShadow: "24px",
  p: 4,
};

interface SignUpModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TransitionsModal({ open, setOpen }: SignUpModalProps) {
  const [registerUser, setRegisterUser] = React.useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState<any>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterUser({
      ...registerUser,
      [event.target.name]: event.target.value,
    });
  };

  const signup = async () => {
    try {
      toast.loading("Loading...");
      const res = await axios.post("/api/users/signup", registerUser);
      toast.dismiss();
      toast.success("User created successfully");
      setOpen(false);
    } catch (error) {
      toast.dismiss(); 
      toast.error("Something is wrong while signing up!");
    }
  };    

  React.useEffect(() => {
    if (
      registerUser.email.length > 0 &&
      registerUser.password.length > 0 &&
      registerUser.username.length > 0 &&
      registerUser.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [registerUser]);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Toaster position="top-center" />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex justify-between">
              <h3 className="font-bold text-2xl">Sign Up</h3>
              <button
                className="bg-black hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
            <div className="flex flex-col items-center mt-5">
              <input
                type="text"
                placeholder="Username"
                className="border-2 rounded-lg w-full p-3 my-2"
                value={registerUser.username}
                onChange={handleChange}
                name="username"
              />
              <input
                type="text"
                placeholder="Full Name"
                className="border-2 rounded-lg w-full p-3 my-2"
                value={registerUser.name}
                onChange={handleChange}
                name="name"
              />
              <input
                type="text"
                placeholder="Email"
                className="border-2 rounded-lg w-full p-3 my-2"
                value={registerUser.email}
                onChange={handleChange}
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 rounded-lg w-full p-3 my-2"
                value={registerUser.password}
                onChange={handleChange}
                name="password"
              />
              <button
                onClick={signup}
                className="bg-black hover:bg-gray-700 text-white font-bold p-4 mt-6 w-full rounded-lg"
              >
                Sign Up
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
