// handleValidation(); {
//     const password = this.state.password
//     const confirmPassword = this.state.confirmPassword
//     const errors = {};
//     const formIsValid = true;
//     //validation
//     if (!password) {
//         formIsValid = false;
//         errors["password"] = "Password is required.";
//     }
//     if (!confirmPassword) {
//         formIsValid = false;
//         errors["confirmPassword"] = "Confirmation password is required.";
//     }
//     if (password && confirmPassword) {
//         if (password.length < 5) {
//             formIsValid = false;
//             errors["password"] = "Password minimum lenght is 5.";
//         } else if (password !== confirmPassword) {
//             formIsValid = false;
//             errors["password"] = "The password confirmation does not match.";
//         }
//     }
//     this.setState({
//         errors: errors
//     })
//     return formIsValid;
// }