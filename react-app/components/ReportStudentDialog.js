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

export default function CustomizedDialogs({ student, setOpen, tutor }) {
    const handleClose = () => {
        setReportText('')
        setOpen(false);
    };
    
    const handleSubmit = async () => {
        console.log(student)
        console.log(reportText)
        student.reported=true
        student.report = {"tutor": {"_id":tutor._id, "name":`${tutor.firstname} ${tutor.lastname}`}, "text": reportText}
        await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: student._id, data: student })
        })
        let reports = "reports" in tutor ? tutor.reports : []
        reports.push({
            "student": {"_id":student._id, "name":`${student.firstname} ${student.lastname}`},
            "time": new Date(Date.now()).toLocaleString("en-US"),
            "text": reportText
        })
        await fetch('/api/mongodb', {
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, data: { reports: reports, last_updated: new Date(Date.now()).toLocaleString("en-US") } })
        })
        handleClose();
    };
    const handleChange = (e) => {
        setReportText(e.target.value)
    }
    let [reportText, setReportText] = useState()
    return (
        <>
            <Dialog aria-labelledby="customized-dialog-title" open={student ? true : false} fullWidth>
                <DialogContent dividers>
                    <Typography variant="h5" gutterBottom style={{color:"black"}}>
                        Signaler {student.firstname} {student.lastname} :
          </Typography>
          <Typography>
          Veuillez nous donner plus de détails..
          </Typography>
                </DialogContent>
                <DialogActions>
                    <div className="12u">
                        <textarea name="report-text" id={`dialog-${student._id}`} style={{backgroundColor:"#0f111f", color:"white"}} placeholder="Décrivez ce qui s'est passé.." rows="6" value={reportText} onChange={e=>handleChange(e)}></textarea>
                    </div>
                </DialogActions>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
          </Button>
          
          <Button autoFocus onClick={()=>handleSubmit()} color="primary">
                        Submit Report
          </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
