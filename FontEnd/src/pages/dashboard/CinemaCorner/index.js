import React, { useState } from "react";
import { Container } from "reactstrap";



const cinemaCorner = () => {

  return (
    <React.Fragment>
     <Container style={{paddingTop:120}}>
     <div>
      <div className="header">
        <h1>DIỄN VIÊN</h1>
        <div className="filters">
          <select>
            <option>Quốc Gia</option>
          </select>
          <select>
            <option>Xem Nhiều Nhất</option>
          </select>
        </div>
      </div>
      
      <div className="actors">
        <div className="actor">
          <img src="chris_evans.jpg" alt="Chris Evans" />
          <h3>Chris Evans</h3>
          <p>Khác với Chris Hemsworth vẫn đang tỏa sáng hoạt động hình tượng vì thần sấm, dạ số người hâm mộ vẫn nhìn nhận rõ ràng, Chris Evans và Captain America là hai con người hoàn toàn khác nhau.</p>
        </div>
        
        <div className="actor">
          <img src="margot_robbie.jpg" alt="Margot Robbie" />
          <h3>Margot Robbie</h3>
          <p>Dĩ nhiên, có nhân sắc chẳng bao giờ là đủ để đảm bảo cho chiếc vé thành công tại Hollywood, Margot còn phải có gắng nhiều. Nhưng tài biết, hiện nay hãng xưởng đang được coi là minh tinh hàng A!</p>
        </div>
        
        <div className="actor">
          <img src="charlize_theron.jpg" alt="Charlize Theron" />
          <h3>Charlize Theron</h3>
          <p>Đất đầu từ vai diễn không có lời thoại, chỉ xuất hiện 3 giây trong một bộ phim hạng B, Charlize Theron nay đã trở thành nữ thần của Hollywood.</p>
        </div>
      </div>
      
      <div className="movie-poster">
        <img src="furiosa_poster.jpg" alt="Furiosa: Cầu Chuyện Từ Max Điên" />
        <div className="movie-info">
          <h2>Furiosa: Cầu Chuyện Từ Max Điên</h2>
          <p>Được trả thù</p>
          <p>Đạt dấu sớm</p>
        </div>
      </div>
    </div>
     </Container>
    </React.Fragment>
  );
};

export default cinemaCorner;
