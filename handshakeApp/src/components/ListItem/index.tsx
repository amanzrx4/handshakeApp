import {BodyEmphasized, H3} from '@app/lib/styles/common';
import {Container, ItemLeft, ItemMiddle, ItemRight} from './styles';
import {PressableProps} from 'react-native';

interface Props extends PressableProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title: string;
  desc?: string;
}

const ListItem: React.FC<Props> = ({left, right, title, desc, ...props}) => {
  return (
    <Container {...props}>
      {left && <ItemLeft>{left}</ItemLeft>}

      <ItemMiddle>
        <BodyEmphasized lineHeight={20}>{title}</BodyEmphasized>
        {desc && <H3 weight="500">{desc}</H3>}
      </ItemMiddle>

      {right && <ItemRight>{right}</ItemRight>}
    </Container>
  );
};

export default ListItem;
