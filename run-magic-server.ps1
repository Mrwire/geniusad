# Script PowerShell pour démarrer et maintenir le serveur @21st-dev/magic

# Configuration de la clé API
$API_KEY = "51b307d0e68cad9668c6b30d92aa280e7ba61db9e57be6d6561a7826a1aecaa3"
$LOG_FILE = "magic-server.log"

# Fonction pour écrire dans le journal
function Write-Log {
    param (
        [string]$Message
    )
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    
    Write-Host $logMessage
    Add-Content -Path $LOG_FILE -Value $logMessage
}

# Effacer le journal précédent
if (Test-Path $LOG_FILE) {
    Remove-Item $LOG_FILE -Force
}

Write-Log "Démarrage du serveur @21st-dev/magic..."
Write-Log "Clé API configurée: $($API_KEY.Substring(0, 4))...$($API_KEY.Substring($API_KEY.Length - 4))"

# Configurer les variables d'environnement
$env:MAGIC_API_KEY = $API_KEY
$env:API_KEY = $API_KEY
$env:DEBUG = "*"

# Boucle pour redémarrer le serveur s'il se termine
while ($true) {
    Write-Log "Lancement du serveur MCP..."
    
    # Démarrer le processus et capturer sa sortie
    $process = Start-Process -FilePath "cmd.exe" -ArgumentList "/c npx -y @21st-dev/magic@latest" -NoNewWindow -PassThru -RedirectStandardOutput "magic-stdout.log" -RedirectStandardError "magic-stderr.log"
    
    Write-Log "Serveur démarré avec PID: $($process.Id)"
    Write-Log "En attente du serveur..."
    
    # Attendre que le processus se termine
    $process.WaitForExit()
    
    # Lire et enregistrer les journaux
    $stdout = Get-Content "magic-stdout.log" -ErrorAction SilentlyContinue
    $stderr = Get-Content "magic-stderr.log" -ErrorAction SilentlyContinue
    
    if ($stdout) {
        Write-Log "Sortie standard du serveur:"
        foreach ($line in $stdout) {
            Write-Log "  STDOUT: $line"
        }
    }
    
    if ($stderr) {
        Write-Log "Erreurs du serveur:"
        foreach ($line in $stderr) {
            Write-Log "  STDERR: $line"
        }
    }
    
    Write-Log "Le serveur s'est arrêté avec le code de sortie: $($process.ExitCode)"
    Write-Log "Redémarrage du serveur dans 2 secondes..."
    
    # Supprimer les fichiers de journaux temporaires
    Remove-Item "magic-stdout.log" -ErrorAction SilentlyContinue
    Remove-Item "magic-stderr.log" -ErrorAction SilentlyContinue
    
    # Attendre avant de redémarrer
    Start-Sleep -Seconds 2
}
