#!/usr/bin/env bash
# encoding: UTF-8
#
# Author:     Konrad Jurk <konrad.jurk@acrolinx.com>
# Created:    23.12.17

set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
  echo "Skipping deploy; just doing a build."
  exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into dist/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deploy)
git clone $REPO dist
cd dist
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Build Demo Ember App
bower install ember
node_modules/ember-cli/bin/ember build --prod

# Now let's go have some fun with the cloned repo
cd dist
git config user.name "Travis CI"
git config user.email "deploy@travis-ci.org"

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add -A .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH <<!
konradjurk
$GITHUB_TOKEN
!
