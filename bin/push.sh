#!/bin/bash

echo "Run this file at root of project"
read -e -p "Enter git commit message : " COMMITMESSAGE

git add .
git commit -m "$COMMITMESSAGE"
git push