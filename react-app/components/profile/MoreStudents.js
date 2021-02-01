import { useState } from "react" 
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'; 
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const DialogContent = withStyles(theme => ({
    root: { 
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
 
const DialogActions = withStyles(theme => ({ 
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


const MoreSeances = ({ user }) => {
    const handleAskedMoreStudents = async () => {
        user.asked_more_students = { 
            time: new Date(Date.now()).toLocaleString("en-US"),
            number: numberStudents
        }
        const res = await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: user._id, data: { asked_more_students: user.asked_more_students }})
        })
        setAskedMoreStudents(true)
        handleClose()
    }

    const handleClose = () => {
        setNumberStudents("")
        setOpen(false)
    }

    const cancelAskedMoreStudents = async () => { 
        delete user.asked_more_students
        const res = await fetch('/api/mongodb?unset=true', {
            method: 'post',
            body: JSON.stringify({ _id: user._id, data: { asked_more_students: "" } })
        })
        setAskedMoreStudents(false) 
    } 

    const [askedMoreStudents, setAskedMoreStudents] = useState(user.asked_more_students)
    const [numberStudents, setNumberStudents] = useState("")
    const [open, setOpen] = useState()

    return (
        <>
            {askedMoreStudents ? <>
                <p style={{ display: "inline" }}>Vous avez demandé {user.asked_more_students.number} élèves de plus. </p>
                <button className="button special" style={{ fontSize: "11px", marginBottom: "2em" }} onClick={() => cancelAskedMoreStudents()}>Annuler la demande</button>
            </>
                : <button className="button icon fa-plus" style={{ fontSize: "12px", marginBottom: "2em" }} onClick={() => setOpen(true)}>{"Demander plus d'élèves"}</button>
            }

            <Dialog aria-labelledby="customized-dialog-title" open={open} fullWidth>
                <DialogContent dividers>
                    <Typography variant="h5" gutterBottom style={{ color: "black" }}> 
                        Demander plus d'élèves
                    </Typography>
                    <Typography>
                        Vous voulez combien d'élèves de plus ?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <div className="12u">
                        <input type="text" id="groupI" style={{ backgroundColor: "#1f233f", color: "white" }} value={numberStudents} onChange={e => setNumberStudents(parseInt(e.target.value))} />
                    </div>
                </DialogActions>
                <DialogActions>
                    <Button autoFocus onClick={() => handleClose()} color="primary">
                        Cancel
                    </Button>

                    <Button autoFocus onClick={() => numberStudents ? handleAskedMoreStudents() : null} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MoreSeances