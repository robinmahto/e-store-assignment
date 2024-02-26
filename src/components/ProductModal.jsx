import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";

const ProductModal = ({ open, setOpen, productDetails }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <h1 className="font-bold">Product Details</h1>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="flex items-center gap-4">
            <div className="w-1/2 border border-teal-600 p-3 rounded-md">
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="w-32 h-32"
              />
            </div>
            <div className="w-1/2 flex flex-col  gap-1">
              <h1 className="font-bold text-lg">{productDetails?.title}</h1>
              <p className="text-sm line-clamp-3">
                {productDetails?.description}
              </p>
              <span className="font-bold text-lg">
                ${productDetails?.price}
              </span>
              <p>&#11088; {productDetails?.rating?.rate}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ProductModal;
