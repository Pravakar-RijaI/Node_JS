const express = require('express');
const fs = require('fs');
const users = require(`${__dirname}/MOCK_DATA.json`);

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
    const html =
        `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
    res.send(html);
});

app.get("/api/users", (req, res) => {
    return res.json(users);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        const body = req.body;
        const user = users.find((user) => user.id === body.id);
        user.first_name = body.first_name;
        user.last_name = body.last_name;
        user.email = body.email;
        user.job_title = body.job_title;
        users.push(user);

        fs.writeFile(`${__dirname}/users.json`, JSON.stringify(users), () => {
            return res.json({ status: "success" });
        })
    })
    .delete((req, res) => {
        return res.json({ status: "pending" });
    });

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });

    fs.writeFile(`${__dirname}/users.json`, JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: users.length });
    });
});

app.listen(PORT, () => {
    console.log("Listening on port 8000...");
});