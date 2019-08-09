import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import styled from '@emotion/styled';
import Form from './form';

const BlockContentInt = styled(BlockContent)(`line-height: 20px;`);

const CustomStyleSerializer = props => {
  return <p>{props.children}</p>;
};

function AnchorSerializer({children, mark}) {
  return <span id={mark.id}>{children}</span>;
}

function FormSerializer({node: {title, id, body, fields}}) {
  return <Form title={title} id={id} description={body} fields={fields} />;
}

export default function HomeBlock({blocks}) {
  return (
    <BlockContentInt
      blocks={blocks}
      serializers={{
        types: {
          p: CustomStyleSerializer,
          form: FormSerializer
        },
        marks: {
          anchor: AnchorSerializer
        }
      }}
    />
  );
}
