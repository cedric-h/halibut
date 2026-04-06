`find src | grep -E "[ts|tsx]$" | entr -rs 'npm run tsc && echo "no prob"'`
