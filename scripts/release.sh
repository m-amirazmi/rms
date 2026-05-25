#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/release.sh <version> <feature-id> <feature-title>
# Example: ./scripts/release.sh v0.0.3 pos-03 "App Shell & Layout"
#
# Creates a changelog from template, opens $EDITOR for you to fill details,
# then commits, tags with annotated tag, and pushes to origin/main.

if [ $# -lt 3 ]; then
  echo "Usage: $0 <version> <feature-id> <feature-title>"
  echo "Example: $0 v0.0.3 pos-03 'App Shell & Layout'"
  exit 1
fi

VERSION="$1"
FEATURE_ID="$2"
FEATURE_TITLE="$3"

# derive values
SLUG=$(echo "$FEATURE_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
FILENAME="apps/pos/docs/changelog/${VERSION}-${SLUG}.md"
SPEC="pos-$(echo "$FEATURE_ID" | sed 's/pos-//').md"
DATE=$(date +%Y-%m-%d)

# remote and branch
REMOTE="origin"
BRANCH="main"

echo "→ Creating changelog: $FILENAME"

# create changelog from template
cp apps/pos/docs/changelog/_template.md "$FILENAME"

# fill template tokens
sed -i '' "s/{{VERSION}}/$VERSION/g" "$FILENAME"
sed -i '' "s/{{FEATURE_ID}}/$FEATURE_ID/g" "$FILENAME"
sed -i '' "s/{{FEATURE_TITLE}}/$FEATURE_TITLE/g" "$FILENAME"
sed -i '' "s/{{DATE}}/$DATE/g" "$FILENAME"
sed -i '' "s|{{FEATURE_SPEC}}|$SPEC|g" "$FILENAME"

# open in editor for the user to fill in the details
EDITOR="${EDITOR:-vim}"
echo "→ Opening $EDITOR — fill in Added/Changed/Fixed/Technical sections, then save & quit"
"$EDITOR" "$FILENAME"

# check if template placeholders are still present
if grep -q '{{' "$FILENAME"; then
  echo "⚠ Warning: some template placeholders ({{...}}) were not replaced."
  echo "  Edit $FILENAME manually before running git commands."
fi

LATEST=$(git rev-parse HEAD)

echo "→ Staging changelog..."
git add "$FILENAME"

echo "→ Committing..."
git commit -m "docs(pos): add $VERSION-$SLUG changelog"

echo "→ Creating annotated tag $VERSION..."
git tag -a "$VERSION" HEAD -F "$FILENAME"

echo "→ Pushing to $REMOTE/$BRANCH..."
git push "$REMOTE" "$BRANCH" --tags

echo "✓ Done! Released $VERSION — $FEATURE_TITLE"
