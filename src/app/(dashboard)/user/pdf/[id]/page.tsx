"use client";

import React, { useEffect, useRef } from "react";

export default function PDFVerifypage({ params }: { params: { id: string } }) {
  console.log(params.id);
  return <App id={params.id} />;
}

function App({ id }: { id: string }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit: {
      load?: any;
      unload?: any;
      Action?: any;
      Annotation?: any;
      AnnotationsWillChangeReason?: any;
      Bookmark?: any;
      ButtonFormField?: any;
      CheckBoxFormField?: any;
      ChoiceFormField?: any;
      Color?: any;
      ComboBoxFormField?: any;
      Comment?: any;
      CommentMarkerAnnotation?: any;
      Conformance?: any;
      CustomOverlayItem?: any;
      DrawingPoint?: any;
      EllipseAnnotation?: any;
      Font?: any;
      FormField?: any;
      FormFieldValue?: any;
      FormOption?: any;
      GoToAction?: any;
      GoToEmbeddedAction?: any;
      GoToRemoteAction?: any;
      HideAction?: any;
      HighlightAnnotation?: any;
      ImageAnnotation?: any;
      InkAnnotation?: any;
      Inset?: any;
      Instance?: any;
      InstantClient?: any;
      Interfaces?: any;
      JavaScriptAction?: any;
      LaunchAction?: any;
      LineAnnotation?: any;
      LinkAnnotation?: any;
      List?: any;
      ListBoxFormField?: any;
      NamedAction?: any;
      NoteAnnotation?: any;
      OutlineElement?: any;
      PageInfo?: any;
      Point?: any;
      PolygonAnnotation?: any;
      PolylineAnnotation?: any;
      RadioButtonFormField?: any;
      Rect?: any;
      RectangleAnnotation?: any;
      RedactionAnnotation?: any;
      ResetFormAction?: any;
      SearchResult?: any;
      SearchState?: any;
      ShapeAnnotation?: any;
      SignatureFormField?: any;
      Size?: any;
      SquiggleAnnotation?: any;
      StampAnnotation?: any;
      StrikeOutAnnotation?: any;
      SubmitFormAction?: any;
      TextAnnotation?: any;
      TextFormField?: any;
      TextLine?: any;
      TextMarkupAnnotation?: any;
      TextSelection?: any;
      URIAction?: any;
      UnderlineAnnotation?: any;
      UnknownAnnotation?: any;
      ViewState?: any;
      WidgetAnnotation?: any;
      default?: any;
    };

    (async function () {
      PSPDFKit = await import("pspdfkit");
      await PSPDFKit.load({
        container,
        document: `https://utfs.io/f/${id}.pdf`, // Use the id to fetch the correct document
        baseUrl: `${window.location.protocol}//${window.location.host}/`,
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [id]); // Add id as a dependency

  return (
    <>
      <div ref={containerRef} style={{ height: "100vh" }} />
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}
