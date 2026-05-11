$replacements = @(
    @("Trang chá»§", "Trang chủ"),
    @("Giá»›i thiá»‡u", "Giới thiệu"),
    @("Ä áº·t nhÃ ", "Đặt nhà"),
    @("KÃ­ gá»­i nhÃ  Ä‘áº¥t", "Kí gửi nhà đất"),
    @("Tin tá»©c", "Tin tức"),
    @("Quáº£ng cÃ¡o", "Quảng cáo"),
    @("LiÃªn há»‡", "Liên hệ"),
    @("GIá»Ž HÃ€NG", "GIỎ HÀNG"),
    @("NhÃ  mÃ´i giá»›i Báº¥t Ä á»™ng Sáº£n", "Nhà môi giới Bất Động Sản"),
    @("Ngá» c NN Logo", "Ngọc NN Logo"),
    @("CÃ¢u há» i thÆ°á» ng gáº·p", "Câu hỏi thường gặp"),
    @("Há»— trá»£", "Hỗ trợ"),
    @("Kinh nghiá»‡m", "Kinh nghiệm"),
    @("Giao dá»‹ch", "Giao dịch"),
    @("KhÃ¡ch hÃ ng", "Khách hàng"),
    @("Kháº£o sÃ¡t", "Khảo sát"),
    @("minh báº¡ch", "minh bạch")
)

$files = Get-ChildItem -Path . -Filter *.html -File
foreach ($file in $files) {
    # Skip files I already fixed manually to save time
    if ($file.Name -match "index.html|tin-tuc.html|faq.html|contact.html") { continue }
    
    Write-Host "Processing $($file.Name)..."
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    foreach ($pair in $replacements) {
        $content = $content.Replace($pair[0], $pair[1])
    }
    # Fix common mis-encodings of & and other chars if needed
    $content = $content -replace "Ä Ãºng nhÃ ", "Đúng nhà"
    $content = $content -replace "Ä Ãºng giÃ¡", "Đúng giá"
    $content = $content -replace "Ä Ãºng phÃ¡p lÃ½", "Đúng pháp lý"
    
    $Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($file.FullName, $content, $Utf8NoBom)
}
