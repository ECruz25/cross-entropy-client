import { makeStyles } from "@material-ui/core/styles";

const useGridStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 200
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

export default useGridStyles;
