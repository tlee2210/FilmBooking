package com.cinemas.job;

import com.cinemas.entities.Voucher;
import com.cinemas.enums.StatusVoucher;
import com.cinemas.repositories.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class ScheduledTasks {
    @Autowired
    private VoucherRepository voucherRepository;

    @Scheduled(cron = "0 0 0 * * *")
//    @Scheduled(cron = "*/30 * * * * *")
    public void reportCurrentTime() {

        //        System.out.println("ok");
//        Document document = Jsoup.connect("https://www.galaxycine.vn/phim-dang-chieu/").get();
//        System.setProperty("webdriver.chrome.driver","C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe");
//        WebDriver driver = new ChromeDriver();
//        driver.get("https://www.galaxycine.vn/phim-dang-chieu/");
//        Thread.sleep(10000);
//        List<WebElement> elements = driver.findElements(By.cssSelector("[style='margin-bottom:11px'] a[href]"));
//        List<WebElement> elements = driver.findElements(By.cssSelector("Card_card__wrapper__RUTBs"));
//        Elements elements = document.getElementsByClass("Card_card__wrapper__RUTBs");
//        System.out.println("================================");
//        System.out.println("document: " + document);
//        System.out.println("================================");
//        System.out.println("elements: " + elements);
//
//        for (Element e : elements){
//        for (WebElement e : elements) {
//            System.out.println("================================");
//            System.out.println("Href: " + element.getAttribute("href"));

//            System.out.println(e);
//            System.out.println("================================");
//        }


//        driver.quit();
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void removeExpiredVoucher(){
        LocalDate today = LocalDate.now();
        List<Voucher> expiredVouchers = voucherRepository.findByExpirationDateBefore(today);

        for (Voucher voucher : expiredVouchers) {
            voucher.setStatusVoucher(StatusVoucher.EXPIRED);
            voucherRepository.save(voucher);
        }
    }
}
