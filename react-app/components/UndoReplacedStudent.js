import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';


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

export default function CustomizedDialogs({ replacingStudent, setReplacingStudent, report, tutor }) {
    const handleClose = () => {
        setGroupId('')
        setReplacingStudent(false);
    };

    const handleSubmit = async () => {
        await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: replacingStudent._id, data: { "groupId": groupId } })
        })
        delete report.replaced_by
        delete report.mod
        await fetch('/api/mongodb?deletingData', {
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, data: tutor })
        })
        handleClose()
    };
    let [groupId, setGroupId] = useState()
    return (
        <>
            <Dialog aria-labelledby="customized-dialog-title" open={replacingStudent ? true : false} fullWidth>
                <DialogContent dividers>
                    <Typography variant="h5" gutterBottom style={{ color: "black" }}>
                        Undo :
                    </Typography>
                    <Typography>
                        Donnez le groupe où vous voulez mettre {replacingStudent.name}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <div className="12u">
                        <input type="text" name="demo-name" id="groupI" style={{ backgroundColor: "#0f111f", color: "white" }} value={groupId} onChange={e => setGroupId(parseInt(e.target.value))} />
                    </div>
                </DialogActions>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>

                    <Button autoFocus onClick={() => handleSubmit()} color="primary">
                        Submit Report
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
