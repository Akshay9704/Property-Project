import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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
  const handleClose = () => setOpen(false);

  return (
    <div>
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
              />
              <input
                type="password"
                placeholder="Password"
                className="border-2 rounded-lg w-full p-3 my-2"
              />
              <button className="bg-black hover:bg-gray-700 text-white font-bold p-4 mt-6 w-full rounded-lg">
                Sign In
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
