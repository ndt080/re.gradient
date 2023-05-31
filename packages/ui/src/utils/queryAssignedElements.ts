export function queryAssignedElements<T extends HTMLElement[]>(
  target: HTMLElement,
  slotName: string,
): T {
  const el = target.shadowRoot ? target.shadowRoot : target;
  const slotEl = el.querySelector<HTMLSlotElement>(`slot[name=${slotName}]`);

  return (slotEl?.assignedElements() as T) ?? [];
}
