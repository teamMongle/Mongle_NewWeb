import React from "react";
import styled from "styled-components";
import image1 from "../../assets/images/firstImg.png";
import image2 from "../../assets/images/secondImg.png";
import image3 from "../../assets/images/thirdImg.png";

const Card = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    transition: transform 0.2s ease-in-out;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  display: flex;
  flex-direction: column;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
`;

const Tag = styled.span`
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 12px;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 8px 0;
`;

const Description = styled.p`
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 0;
  margin-bottom: 60px;
`;

const FeaturedCard = ({ image, title, description, tags }) => {
  return (
    <Card>
      <CardImage src={image} alt={title} />
      <CardContent>
        <Tags>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CardContent>
    </Card>
  );
};

function FeaturedCards() {
  const featuredCards = [
    {
      image: image1,
      title: "회사원 맞아? 도둑 아니고?",
      description: "<어둠의 기업에서 능력 흡수합니다> 이강승",
      tags: ["연재무료", "지금까지", "이런개발자는없었다"],
    },
    {
      image: image2,
      title: "투명 드래곤 되는 비결은?",
      description: "<백작가의 투명드래곤 개발자가 되었다!> 몽실이",
      tags: ["50화무료", "말단개발자에서", "고인물개발자로"],
    },
    {
      image: image3,
      title: "내가 사는 세상이 코드 속이라고?",
      description: "<버그 수정했는데 현실이 바뀌었다> 최연정",
      tags: ["30화무료", "일상을위해", "오류수정"],
    },
  ];

  return (
    <CardsContainer>
      {featuredCards.map((card, index) => (
        <FeaturedCard
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          tags={card.tags}
        />
      ))}
    </CardsContainer>
  );
}

export default FeaturedCards;
