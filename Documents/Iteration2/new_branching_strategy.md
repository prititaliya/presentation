# Branching Strategy

## Structure:

### Main Branch
- Contains the most stable and current production-ready code.

### Develop Branch
- Receives merges from feature branches.
- Provides a staging area for code before moving to main.

### Feature Branches
- These are created from the `Develop` branch.
- They represent a new feature for the app.
- They are merged back into `Develop` after completion and approval.

### User Story Branches
- These are created from the associated `Feature` branch.
- They represent a specific user story under the feature.
- They get merged back into the corresponding `Feature` branch upon completion.
- They have their own `Dev` and `Test` branches.
- They sometimes have `Bug` branches if necessary.

### Dev Task Branches
- These are created from the associated `User Story` branch.
- They represent a specific development task within a user story.
- Ideally they should contain minimal, focused changes. Few files affected as possible.
- They get merged back into the `User Story` branch once completed.

### Testing Branches
- These are created from either a `User story` or `Feature` branch.
- They are used for testing and debugging purposes.
- Later they are merged back into the corresponding parent branch once testing is complete.

### Technical Debt Branches
- Refactoring tasks created from the `Develop` branch.
- Identified after iteration feedback or during development, and scheduled for later when needed.
- Focus on code quality, performance, or architectural improvements.

## Procedure:

1. **Create a Develop Branch**
   - Cloned from `main`.
   - Naming convention: `Develop`

2. **Create a Feature Branch**
   - Cloned from `Develop`.
   - Naming convention: `Feature#[NUMBER]_[SHORT DESCRIPTION]`

3. **For each user story, create a User Story Branch**
   - Cloned from the associated `Feature` branch.
   - Naming convention: `Story#[NUMBER]_[SHORT DESCRIPTION]`

4. **For each dev task, create a Dev Task Branch**
   - Cloned from the associated `User Story` branch.
   - Naming convention: `Dev#[NUMBER]_[SHORT DESCRIPTION]`

5. **For testing purposes, create a Testing Branch**
   - Cloned from either a `Feature` or `User Story` branch.
   - Naming convention: `Test#[NUMBER]_[SHORT DESCRIPTION]`

6. **If needed, create a Bug Branch**
   - Cloned from either a `Feature` or `User Story` branch.
   - Naming convention: `Bug#[NUMBER]_[SHORT DESCRIPTION]`

7. **If needed, after evaluations or when availability allows, create a TechDebt Branch**
   - Cloned from a `Develop` branch.
   - Naming convention: `TechDebt#[NUMBER]_[SHORT DESCRIPTION]`

## Branch Naming Scheme (Examples):
- `Feature#009_AccountManagement`
- `Story#034_UserAuthentication`
- `Dev#025_CreateLoginActivity`
- `Test#008_LoginTesting`

## Visual Representation


### Color Legend:
- Main Branch (Dark Gray)
- Develop Branch (Purple)
- Feature Branches (Light Yellow)
- Story Branches (Light Blue)
- Dev Branches (Light Green)
- Test Branches (Yellow)
- Bug Branches (Brown)
- Technical Debt Branches (Pink)

# Git Branching Strategy

![Git Branching Strategy](Documents/Iteration2/branch_strategy.png)
