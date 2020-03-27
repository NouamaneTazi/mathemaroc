import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ open, setOpen }) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div >
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <div className="inner" style={{padding:"10px"}}>
                    <p style={{color:"black", margin:"5px"}}>Veuillez nous donner plus de détails :</p>
                    <div className="12u">
                        <textarea style={{border:"solid "}} name="demo-message" id="demo-message" placeholder="Enter your message" rows="6"></textarea>
                    </div>
                    <div className="button special" onClick={() => handleSubmit()}>Submit</div>
                    <div className="button special" onClick={() => setOpen(close)}>Close</div>
                </div>
            </Dialog>
        </div>
    );
}
