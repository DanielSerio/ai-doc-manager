# Documentation Workflow

This document outlines the documentation workflow for generating, developing, and archiving documentation for particular features.

## Structure Overview

Our docs folder has 4 "buckets" for feature documentation:

1. `docs/archive/` - Archived feature documentation.
2. `docs/specs/` - Specifications for particular features.
3. `docs/tasks/` - Tasks for particular features.
4. `docs/implementations/` - Implementations for particular features.

## Workflow

The agent should be listening for user requests to generate, develop, and archive documentation for particular features. We will use a "shopping cart feature" as an example in this document.

### Generating Documentation

1. When the user requests to "generate documentation for the shopping cart feature":
    1. the agent should generate a new Gherkin spec file in the `docs/specs/` folder. The agent should use the `docs/specs/[FEATURE_NAME].feature` naming convention. The agent should prefer simplicity when creating the Gherkin spec file. The agent should not include implementation details in the Gherkin spec file.
    2. the agent should generate a new task file in the `docs/tasks/` folder. The agent should use the `docs/tasks/[FEATURE_NAME].md` naming convention. The agent should prefer simplicity when creating the task file. The agent should not include implementation details in the task file.
    3. the agent should generate a new implementation file in the `docs/implementations/` folder. The agent should use the `docs/implementations/[FEATURE_NAME].md` naming convention. The agent should prefer simplicity when creating the implementation file.
2. When the user requests to "develop the shopping cart feature":
    1. the agent should read the appropriate spec, task, and implementation files. 
    2. the agent should begin developing the feature based on the spec, task, and implementation files. The agent should make sure to update the task file as phases are completed. This ensures proper tracking of progress through session handoff.
3. When the user requests to "archive our documentation":
    1. the agent should review the files in the tasks folder to determine which features have been completed.
    2. the agent should create a 1 paragraph maximum summary for each completed feature. 
    3. this summary should be appended to the "current summary document" in the `docs/archive` folder. The agent should use the `docs/archive/SUMMARY-[N].md` naming convention. The summary file with the highest number should be considered the "current summary document". When a document is around 500 lines, the agent should create a new summary document and increment the number.
    4. the agent should delete the completed feature files from the `docs/tasks/`, `docs/implementations/`, and `docs/specs/` folders.