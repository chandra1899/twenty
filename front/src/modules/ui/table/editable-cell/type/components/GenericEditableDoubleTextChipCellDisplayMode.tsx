import { useRecoilState } from 'recoil';

import { CompanyChip } from '@/companies/components/CompanyChip';
import { PersonChip } from '@/people/components/PersonChip';
import {
  ViewFieldDefinition,
  ViewFieldDoubleTextChipMetadata,
} from '@/ui/editable-field/types/ViewField';
import { Entity } from '@/ui/input/relation-picker/types/EntityTypeForSelect';
import { useCurrentRowEntityId } from '@/ui/table/hooks/useCurrentEntityId';
import { tableEntityFieldFamilySelector } from '@/ui/table/states/tableEntityFieldFamilySelector';

type OwnProps = {
  viewField: ViewFieldDefinition<ViewFieldDoubleTextChipMetadata>;
};

export function GenericEditableDoubleTextChipCellDisplayMode({
  viewField,
}: OwnProps) {
  const currentRowEntityId = useCurrentRowEntityId();

  const [firstValue] = useRecoilState<string>(
    tableEntityFieldFamilySelector({
      entityId: currentRowEntityId ?? '',
      fieldName: viewField.metadata.firstValueFieldName,
    }),
  );

  const [secondValue] = useRecoilState<string>(
    tableEntityFieldFamilySelector({
      entityId: currentRowEntityId ?? '',
      fieldName: viewField.metadata.secondValueFieldName,
    }),
  );

  const [avatarUrlValue] = useRecoilState<string>(
    tableEntityFieldFamilySelector({
      entityId: currentRowEntityId ?? '',
      fieldName: viewField.metadata.avatarUrlFieldName,
    }),
  );

  const displayName = `${firstValue} ${secondValue}`;

  switch (viewField.metadata.entityType) {
    case Entity.Company: {
      return <CompanyChip id={currentRowEntityId ?? ''} name={displayName} />;
    }
    case Entity.Person: {
      return (
        <PersonChip
          id={currentRowEntityId ?? ''}
          name={displayName}
          pictureUrl={avatarUrlValue}
        />
      );
    }
    default:
      console.warn(
        `Unknown relation type: "${viewField.metadata.entityType}" in GenericEditableDoubleTextChipCellDisplayMode`,
      );
      return <> </>;
  }
}
