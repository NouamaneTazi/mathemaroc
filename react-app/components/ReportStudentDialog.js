import React, { useState } from 'react'; 
import { withStyles } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';  
import Dialog from '@material-ui/core/Dialog'; 
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions'; 
import Typography from '@material-ui/core/Typography';  
import Radio from '@material-ui/core/Radio'; 
import RadioGroup from '@material-ui/core/RadioGroup'; 
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
        let report = {
            "student": { "_id": student._id, "name": `${student.firstname} ${student.lastname}` }, 
            "time": new Date(Date.now()).toLocaleString("en-US"), 
            "text": reportText 
        } 

        if (reportOption === "other" || reportOption.substring(0, 3) === "del") {
            student.reported = true
            student.report = { "tutor": { "_id": tutor._id, "name": `${tutor.fullname}` }, "text": reportText }
            student.prev_groupId = tutor.groupId 
            if (reportOption.substring(0, 3) === "del") { 
                student.groupId = -1 
                report.replaced_by = { name: "--" }  
                report.mod = { name: "Bot" } 
            } 
            await fetch('/api/mongodb', {
                method: 'post',
                body: JSON.stringify({ _id: student._id, data: student }) 
            }) 
        } else if (reportOption === "returnQueue") {  
            await fetch('/api/mongodb?unset=true', {  
                method: 'post',
                body: JSON.stringify({ _id: student._id, data: { groupId: "" } })
            })
            report.replaced_by = { name: "retour liste d'attente" } 
            report.mod = { name: "Bot" }  
        }  
 
        let reports = "reports" in tutor ? tutor.reports : [] 
        reports.push(report) 

        await fetch('/api/mongodb', { 
            method: 'post',
            body: JSON.stringify({ _id: tutor._id, data: { reports: reports } })
        }) 
        handleClose();
    }; 

    let [reportText, setReportText] = useState()  
    let [reportOption, setReportOption] = useState("") 

    return (
        <>
            <Dialog aria-labelledby="customized-dialog-title" open={student ? true : false} fullWidth>  
                <DialogContent dividers> 
                    <Typography variant="h5" gutterBottom style={{ color: "black" }}>   
                        Signaler {student.fullname} :
          </Typography> 
                    <Typography>
                        Décrivez ce qui s'est passé : 
          </Typography> 
                </DialogContent> 
                <DialogActions> 
                    <div className="12u"> 
                        <RadioGroup aria-label="gender" name="gender1" value={reportOption} onChange={(e) => { setReportOption(e.target.value); e.target.value !== 'other' && setReportText(e.target.name) }}>
                            <FormControlLabel value="delete-1" control={<Radio />} name="L'élève est injoignable." label="L'élève est injoignable." style={{ color: "black", textTransform: "none", margin: "0" }} /> 
                            <FormControlLabel value="delete-2" control={<Radio />} name="L'élève m'a mal respecté / a quitté le groupe / ne veut pas travailler." label="L'élève m'a mal respecté / a quitté le groupe / ne veut pas travailler." style={{ color: "black", textTransform: "none", margin: "0" }} />
                            <FormControlLabel value="returnQueue" control={<Radio />} name="L'élève doit revenir à la liste d'attente." label="L'élève doit revenir à la liste d'attente." style={{ color: "black", textTransform: "none", margin: "0" }} />  
                            <FormControlLabel value="other" control={<Radio />} name="Autre" label="Autre" style={{ color: "black", textTransform: "none", margin: "0" }} />
                        </RadioGroup>  
                        {reportOption === "other" && <textarea name="report-text" id={`dialog-${student._id}`} style={{ color: "white" }} placeholder="Décrivez ce qui s'est passé.." rows="6" value={reportText} onChange={e => setReportText(e.target.value)}></textarea>} 
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
