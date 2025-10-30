# start-app.ps1
Write-Host "`n🚀 Starting HTMA Genius App..." -ForegroundColor Cyan

# Navigate to the folder where this script is located
Set-Location -Path $PSScriptRoot

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..."
    npm install
} else {
    Write-Host "✅ Dependencies already installed."
}

# Start the development server
Write-Host "`n🌐 Launching dev server..."
npm run dev
