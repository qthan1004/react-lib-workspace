---
description: Publish a lib to npm via standard-version + git push (triggers CI/CD publish)
---

// turbo-all

# Publish Lib to npm

Use this workflow to publish a lib (e.g. `utils`, `theme`, `dialog`, `typography`) to npm.
This bumps the version, creates a git tag, pushes to the lib's repo, and CI/CD handles the actual npm publish.

## Steps

1. Navigate into the lib directory
```bash
cd libs/<lib-name>
```

2. Check current version and status
```bash
cat package.json | grep version
git status --short
```

3. Run standard-version to bump version + create tag (default: patch bump)
```bash
npx standard-version
```
> For a **minor** bump: `npx standard-version --release-as minor`
> For a **major** bump: `npx standard-version --release-as major`

4. Push code and tags to lib repo
```bash
git push origin master --follow-tags
```

5. Go back to workspace root and update submodule reference
```bash
cd ../..
git add libs/<lib-name>
git commit -m "chore: update <lib-name> submodule"
git push
```

## What Happens Next
- The `git push --follow-tags` pushes the `v*` tag to the lib repo
- GitHub Actions (`publish.yml`) detects the tag and runs: **test → build → publish to npm**
- Check the Actions tab on `github.com/system-core-ui/<lib-name>` to verify publish status

## Important Notes
- Make sure all changes are committed before running `standard-version`
- The lib repo must have `NPM_TOKEN` secret configured in GitHub Settings → Secrets
- Commits following Conventional Commits format will auto-generate CHANGELOG entries
