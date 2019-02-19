export default (theme) => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: 200,
    left: `calc(50% - ${theme.spacing.unit * 50/2}px)`
  },
  yearSelectList: {
    maxHeight: 400,
    padding: 0
  },
  inputField: {
    marginBottom: 15,
    marginTop: 15
  },
  errorLabel: {
    position: 'absolute',
    bottom: -18
  }
})