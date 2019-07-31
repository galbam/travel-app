import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "../components/boards/board.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 36,
    padding: "30px 40px",
    border: "5px solid",
    lineHeight: 1.5,
    backgroundColor: "#00ACC0",
    maxWidth: '442px', maxHeight: '214px', minWidth: '442px', minHeight: '214px',
    borderColor: "#00ACC0",
    fontFamily: [
     
      "Roboto"
  
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
})(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(3)
  }
}));

export default function CustomizedButtons() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" style={{ background: "#494847" }}>
        <Toolbar>
          <img class="logo" src="/images/logo.png" alt="example" />
        </Toolbar>
      </AppBar>
      <div className="board-intro">
        <BootstrapButton
          variant="contained"
          color="primary"
          disableRipple
          className={classes.margin}
        >
        <Typography variant="h4">
          Bootstrap
          </Typography>
        </BootstrapButton>

        <BootstrapButton
          variant="contained"
          color="primary"
          disableRipple
          style={{
            background: "#EEEEEE",
            borderColor: "#EEEEEE",
            color: "black"
          }}
          className={classes.margin}
        > <Typography variant="h4">
         Create a New Trip
          </Typography>
        
        </BootstrapButton>
      </div>
    </div>
  );
}
// export default function ButtonBases() {

//   return (
//     <div>
//       <AppBar position="static" style={{ background: "#494847" }}>
//         <Toolbar>
//           <img class="logo" src="/images/logo.png" alt="example" />
//         </Toolbar>
//       </AppBar>
//       <div className="board-intro">
//         <div className={classes.root}>
//           {images.map(image => (
//             <ButtonBase
//               focusRipple
//               key={image.title}
//               className={classes.image}
//               focusVisibleClassName={classes.focusVisible}
//               style={{
//                 width: image.width
//               }}
//             >
//               <span
//                 className={classes.imageSrc}
//                 style={{
//                   backgroundImage: `url(${image.url})`
//                 }}
//               />
//               <span className={classes.imageBackdrop} />
//               <span className={classes.imageButton}>
//                 <Typography
//                   component="span"
//                   variant="h5"
//                   color="inherit"
//                   className={classes.imageTitle}
//                 >
//                   {image.title}
//                   <span className={classes.imageMarked} />
//                 </Typography>
//               </span>
//             </ButtonBase>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
