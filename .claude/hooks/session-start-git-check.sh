#!/bin/bash
# SessionStart hook: report whether the current branch is caught up with
# origin/main before any work begins.

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  exit 0
fi

git fetch origin --quiet 2>/dev/null

branch="$(git branch --show-current)"

if git rev-parse -q --verify origin/main >/dev/null 2>&1; then
  counts="$(git rev-list --left-right --count origin/main...HEAD 2>/dev/null)"
  behind="$(echo "$counts" | awk '{print $1}')"
  ahead="$(echo "$counts" | awk '{print $2}')"
  sync_msg="origin/main: ${behind} commit(s) behind, ${ahead} commit(s) ahead of HEAD"
else
  sync_msg="origin/main not found"
fi

dirty=""
if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  dirty=" | working tree has uncommitted changes"
fi

msg="Git sync check - branch '${branch}' vs ${sync_msg}${dirty}"

jq -n --arg msg "$msg" '{
  systemMessage: $msg,
  hookSpecificOutput: {
    hookEventName: "SessionStart",
    additionalContext: $msg
  }
}'
