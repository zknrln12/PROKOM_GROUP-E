# WebGIS NDMI - Local Server Launcher (PowerShell)
# This script starts a simple HTTP server on localhost:8000

# Define MIME types
$MimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2" = "font/woff2"
}

$Port = 8000
$Folder = Get-Location

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "WebGIS NDMI - Local Server Launcher" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "Starting HTTP server on http://localhost:$Port" -ForegroundColor Yellow
Write-Host "Folder: $Folder`n" -ForegroundColor Yellow

# Create HTTP listener
$HttpListener = New-Object System.Net.HttpListener
$HttpListener.Prefixes.Add("http://localhost:$Port/")
$HttpListener.Start()

Write-Host "Server is running! Press Ctrl+C to stop.`n" -ForegroundColor Cyan

# Handle requests
while ($HttpListener.IsListening) {
    try {
        $Context = $HttpListener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response
        
        $RequestPath = $Request.Url.LocalPath
        if ($RequestPath -eq "/" -or $RequestPath -eq "") {
            $RequestPath = "/index.html"
        }
        
        $FilePath = Join-Path $Folder $RequestPath.TrimStart("/")
        
        if (Test-Path $FilePath) {
            $FileContent = [System.IO.File]::ReadAllBytes($FilePath)
            $Extension = [System.IO.Path]::GetExtension($FilePath).ToLower()
            $ContentType = if ($MimeTypes.ContainsKey($Extension)) { $MimeTypes[$Extension] } else { "application/octet-stream" }
            
            $Response.ContentType = $ContentType
            $Response.ContentLength64 = $FileContent.Length
            $Response.OutputStream.Write($FileContent, 0, $FileContent.Length)
            
            Write-Host "[200] GET $RequestPath" -ForegroundColor Green
        } else {
            $Response.StatusCode = 404
            $Response.ContentType = "text/html"
            $ErrorMessage = "<h1>404 - File Not Found</h1><p>$RequestPath</p>"
            $Buffer = [Text.Encoding]::UTF8.GetBytes($ErrorMessage)
            $Response.OutputStream.Write($Buffer, 0, $Buffer.Length)
            
            Write-Host "[404] GET $RequestPath" -ForegroundColor Red
        }
        
        $Response.OutputStream.Close()
    } catch {
        Write-Host "Error: $_" -ForegroundColor Red
    }
}

$HttpListener.Stop()