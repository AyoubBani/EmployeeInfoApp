import React, {useState, useEffect} from 'react';
import {Formik, Field, FieldAttributes, useField} from 'formik';
import {
  Button,
  TextField,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import {Employee} from '../types';
type CustomRadionButtonProps = {label: string} & FieldAttributes<{}>;
export const CustomRadionButton: React.FC<CustomRadionButtonProps> = ({label, ...props}) => {
  const [field] = useField<{}>(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};
export interface EditFormProps {
  employee: Employee;
  editEmployee: (updatedEmployeeData: Employee) => void;
}
export const CustomTextField: React.FC<any> = ({
  className,
  placeholder,
  label,
  variant,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      className={className}
      placeholder={placeholder}
      label={label}
      {...field}
      variant={variant}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '250px',
    marginRight: '70px',
  },
  userInput: {
    marginBottom: '35px',
  },
});

export const EditEmployee: React.FC<EditFormProps> = ({employee, editEmployee}) => {
  const classes = useStyles();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(employee);
  useEffect(() => {
    if (employee) {
      setSelectedEmployee(employee);
    }
  }, [employee]);
  return (
    <Formik
      initialValues={selectedEmployee}
      enableReinitialize={true}
      onSubmit={updatedEmployee => {
        editEmployee(updatedEmployee);
      }}
      validate={values => {
        const errors: Record<string, string> = {};
        if (values.username.length < 5) {
          errors.username = 'Username should be at least 5 characters';
        }
        if (values.age > 100 || values.age < 18) {
          errors.age = 'The age should be between 18 - 100';
        }
        if (values.fullName.length < 8 || /\d/.test(values.fullName)) {
          errors.fullName = 'Full Name should at least be 8 character without numbers';
        }
        return errors;
      }}
    >
      {({values, handleSubmit, isSubmitting}) => (
        <form className={classes.formContainer} onSubmit={handleSubmit}>
          <CustomTextField
            className={classes.userInput}
            type="input"
            name="username"
            label="Username"
            variant="outlined"
            value={values.username}
            as={TextField}
          />
          <CustomTextField
            className={classes.userInput}
            type="input"
            name="fullName"
            label="Full Name"
            variant="outlined"
            value={values.fullName}
            as={TextField}
          />

          <div className={classes.userInput}>
            <CustomRadionButton name="sex" type="radio" label="Male" value="M" />
            <CustomRadionButton name="sex" type="radio" label="Female" value="F" />
          </div>
          <CustomTextField
            className={classes.userInput}
            name="age"
            type="number"
            label="Age"
            value={values.age}
            as={TextField}
            variant="outlined"
          />
          <Field className={classes.userInput} name="department" type="select" as={Select}>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Managment">Managment</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
          </Field>
          <Button className={classes.userInput} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};
