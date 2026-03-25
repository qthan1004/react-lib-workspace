---
description: Git commit and push workflow with auto-approve for all commands
---

// turbo-all

# Git Commit & Push

1. Check status
```bash
git status --short
```

2. Stage files
```bash
git add <files>
```

3. Commit with Conventional Commits format
```bash
git commit -m "<type>(<scope>): <subject>"
```

4. Push to remote
```bash
git push
```

## Commit Convention Reference
- `feat(<scope>)`: new feature (minor bump)
- `fix(<scope>)`: bug fix (patch bump)  
- `refactor(<scope>)`: code change, no feat/fix
- `style`: formatting, whitespace
- `chore`: build, tooling, deps
- `docs`: documentation
- `test`: tests
