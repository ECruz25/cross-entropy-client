import { makeStyles } from "@material-ui/core/styles";

const useCardStyles = makeStyles(theme => ({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  anchor: {
    textDecoration: "none",
    color: theme.palette.primary.main
  }
}));

export default useCardStyles;
