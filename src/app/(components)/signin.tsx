import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

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

interface SignInModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TransitionsModal({ open, setOpen }: SignInModalProps) {
  const [loginUser, setLoginUser] = React.useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const signin = async () => {
    try {
      toast.loading("Loading...");
      const res = await axios.post("/api/users/signin", loginUser);
      toast.dismiss();
      toast.success("User logged in successfully");
      window.location.href = "/explore";
    } catch (error) {
      toast.dismiss();
      toast.error("Invalid Credentials!");
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginUser({
      ...loginUser,
      [event.target.name]: event.target.value,
    });
  };

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
              <h3 className="font-bold text-2xl">Sign In</h3>
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
                onChange={handleChange}
                value={loginUser.username}
                name="username"
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 rounded-lg w-full p-3 my-2"
                onChange={handleChange}
                value={loginUser.password}
                name="password"
              />
              <p className="text-md font-bold">username: test | password: 1234</p>
              <button
                onClick={signin}
                className="bg-black hover:bg-gray-700 text-white font-bold p-4 mt-6 w-full rounded-lg"
              >
                Sign In
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
