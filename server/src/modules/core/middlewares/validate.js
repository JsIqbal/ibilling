// function validate(schema) {
//     console.log(schema);
//     function check(req, res, next) {
//         schema
//             .validate(req.body, { abortEarly: false })
//             .then(function () {
//                 next();
//             })
//             .catch(function (err) {
//                 return res.status(400).send(err.errors[0]);
//             });
//     }
//     return check;
// }

// module.exports = validate;
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (err) {
            const errors = [];

            err.inner.forEach((e) => {
                errors.push({ path: e.path, message: e.message });
            });

            res.status(400).send(errors);
        }
    };
};

module.exports = validate;
