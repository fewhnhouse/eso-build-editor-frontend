import React, { useEffect, useState } from "react";
import { Menu, Icon, Card } from "antd";
import styled from "styled-components";
import { abilityFrame } from "../../assets/misc";
import axios from "axios";
import { ClickParam } from "antd/lib/menu";

const { SubMenu } = Menu;

const AbilityBar = styled(Card)`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 500px;
`;

const Ability = styled.img`
  margin: 0px 10px;
`;

const classes = [
  {
    class: "Nightblade",
    items: [
      { title: "Assassination", id: 10 },
      { title: "Shadow", id: 11 },
      { title: "Siphoning", id: 12 }
    ]
  },
  {
    class: "Sorcerer",
    items: [
      { title: "Dark Magic", id: 7 },
      { title: "Daedric Summoning", id: 8 },
      { title: "Storm Calling", id: 9 }
    ]
  },
  {
    class: "Necromancer",
    items: [
      { title: "Grave Lord", id: 54 },
      { title: "Bone Tyrant", id: 55 },
      { title: "Living Death", id: 56 }
    ]
  },
  {
    class: "Templar",
    items: [
      { title: "Aedric Spear", id: 4 },
      { title: "Dawn´s Wrath", id: 5 },
      { title: "Restoring Light", id: 6 }
    ]
  },
  {
    class: "Dragonknight",
    items: [
      { title: "Ardent Flame", id: 1 },
      { title: "Draconic Power", id: 2 },
      { title: "Earthen Heart", id: 3 }
    ]
  },
  {
    class: "Warden",
    items: [
      { title: "Animal Compaonions", id: 13 },
      { title: "Winter´s Embrace", id: 15 },
      { title: "Green Balance", id: 14 }
    ]
  }
];

const myClass = classes.find(esoClass => esoClass.class === "Sorcerer");
const menuStructure = [
  {
    title: "Class",
    items: myClass ? myClass.items : []
  },
  {
    title: "Weapon",
    items: [
      { title: "Two Handed", id: 16 },
      { title: "One Hand and Shield", id: 17 },
      { title: "Dual Wield", id: 18 },
      { title: "Bow", id: 19 },
      { title: "Destruction Staff", id: 20 },
      { title: "Restoration Staff", id: 21 }
    ]
  },
  {
    title: "Armor",
    items: [
      { title: "Light Armor", id: 22 },
      { title: "Medium Armor", id: 23 },
      { title: "Heavy Armor", id: 24 }
    ]
  },
  {
    title: "World",
    items: [
      { title: "Soul Magic", id: 25 },
      { title: "Legerdemain", id: 28 },
      { title: "Vampirism", id: 26 },
      { title: "Werewolf", id: 27 }
    ]
  },
  {
    title: "Guild",
    items: [
      { title: "Mages Guild", id: 30 },
      { title: "Fighters Guild", id: 29 },
      { title: "Psijic Order", id: 34 },
      { title: "Undaunted", id: 31 },
      { title: "Thieves Guild", id: 32 },
      { title: "Dark Brotherhood", id: 33 }
    ]
  },
  {
    title: "Alliance War",
    items: [{ title: "Assault", id: 35 }, { title: "Support", id: 36 }]
  },
  {
    title: "Racial",
    items: [
      { title: "Breton", id: 44 },
      { title: "Redguard", id: 45 },
      { title: "Orc", id: 46 },
      { title: "Nord", id: 47 },
      { title: "Dunmer", id: 48 },
      { title: "Argonian", id: 49 },
      { title: "Altmer", id: 50 },
      { title: "Bosmer", id: 51 },
      { title: "Khajiit", id: 52 },
      { title: "Imperial", id: 53 }
    ]
  },
  {
    title: "Craft",
    items: [
      { title: "Alchemy", id: 37 },
      { title: "Blacksmithing", id: 1 },
      { title: "Clothing", id: 1 },
      { title: "Enchanting", id: 1 },
      { title: "Jewelry Crafting", id: 1 },
      { title: "Provisioning", id: 1 },
      { title: "Woodworking", id: 1 }
    ]
  }
];

const Content = styled.div`
  padding: 40px;
`;
export default () => {
  const [skills, setSkills] = useState([]);
  const [skillLine, setSkillLine] = useState(0);
  useEffect(() => {
    axios
      .get("/skills", {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(({ data }) => {
        console.log(data);
        setSkills(data);
      });
  }, []);
  const handleClick = (e: ClickParam) => {
    console.log("click ", e);
    setSkillLine(parseInt(e.key, 10));
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Menu
        onClick={handleClick}
        style={{
          width: 256,
          height: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          textAlign: "left"
        }}
        defaultSelectedKeys={["sub1-1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        {menuStructure.map((menu, index) => (
          <SubMenu
            key={`sub${index}`}
            title={
              <span>
                <Icon type="mail" />
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.items.map(
              (item: { id: number; title: string }, itemIndex: number) => (
                <Menu.Item key={item.id}>{item.title}</Menu.Item>
              )
            )}
          </SubMenu>
        ))}
      </Menu>
      <Content>
        <AbilityBar>
          {[1, 2, 3, 4, 5].map(e => (
            <Ability src={abilityFrame} />
          ))}
        </AbilityBar>
        <AbilityBar>
          {[1, 2, 3, 4, 5].map(e => (
            <Ability src={abilityFrame} />
          ))}
        </AbilityBar>
        <ul>
          {skills
            .filter((skill: any) => skill.skillline === skillLine)
            .map((el: any) => (
              <li>
                <img
                  src={`https://beast.pathfindermediagroup.com/storage/skills/${
                    el.icon
                  }`}
                />
                {el.name}
              </li>
            ))}
        </ul>
      </Content>
    </div>
  );
};
