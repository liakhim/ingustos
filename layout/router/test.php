<?php
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

echo ($data["params"]);
