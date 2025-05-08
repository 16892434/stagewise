// SPDX-License-Identifier: AGPL-3.0-only
// Toolbar reference element hook
// Copyright (C) 2025 Goetze, Scharpff & Toews GbR

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import { useCyclicUpdate } from './use-cyclic-update';
import { useCallback, useEffect, useRef } from 'preact/hooks';

export function useReferenceElement(referencePath: string, updateRate = 0) {
  // Fetch the reference element using the provided path and return the reference to it.

  const referenceElementRef = useRef<HTMLElement | null>(null);

  const updateReferenceElement = useCallback(() => {
    try {
      const referenceNode = document.evaluate(
        referencePath,
        document,
        (prefix) => {
          return prefix === 'svg' ? 'http://www.w3.org/2000/svg' : null;
        },
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      const referenceElement =
        referenceNode instanceof HTMLElement ? referenceNode : null;

      referenceElementRef.current = referenceElement;
    } catch {
      /* no-op */
    }
  }, [referencePath]);

  useEffect(() => {
    updateReferenceElement();
  }, [updateReferenceElement]);

  useCyclicUpdate(updateReferenceElement, updateRate);

  return referenceElementRef;
}
