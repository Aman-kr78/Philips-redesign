# PowerShell Local Web Server for Philips E-Commerce Application
param([int]$Port = 3000)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
  Write-Host "========================================================" -ForegroundColor Cyan
  Write-Host " Philips E-Commerce Redesign is running locally!" -ForegroundColor Green
  Write-Host " Local URL: $prefix" -ForegroundColor Yellow
  Write-Host "========================================================" -ForegroundColor Cyan
} catch {
  Write-Host "Failed to start listener on $prefix : $_" -ForegroundColor Red
  exit 1
}

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".json" = "application/json"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response

  $localPath = $request.Url.LocalPath
  if ($localPath -eq "/") { $localPath = "/index.html" }
  
  $filePath = Join-Path (Get-Location) ($localPath.TrimStart('/').Replace('/', '\'))

  if (Test-Path $filePath -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
    $contentType = $mimeTypes[$ext]
    if (-not $contentType) { $contentType = "application/octet-stream" }
    
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $response.ContentType = $contentType
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $response.StatusCode = 404
    $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
    $response.OutputStream.Write($buffer, 0, $buffer.Length)
  }
  $response.Close()
}
