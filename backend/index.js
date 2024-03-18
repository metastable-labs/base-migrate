const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/deploy', (req, res) => {
  const { remoteToken, name, symbol } = req.body;

  // Construct the command with constructor arguments
  const deployCommand = `forge script ../script/Deploy.s.sol --broadcast --rpc-url https://sepolia.base.org --constructor-args "${remoteToken}" "${name}" "${symbol}"`;

  exec(deployCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send({ error: error.message });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send({ error: stderr });
    }
    console.log(`Output: ${stdout}`);
    res.send({ output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
