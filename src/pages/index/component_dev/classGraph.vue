<template>
  <div overflow-hidden w-full h-full >
    <pre   class="mermaid" ref="mermaidDom">{{ data }}
      </pre>
  </div>
</template>
<script setup lang="ts">
/**
 * @description: 类图
 */
import mermaid from 'mermaid'
// startOnLoad 是否在页面加载时自动初始化 
import panzoom from 'panzoom';
const data = `classDiagram
    class AnnotationAttributesFormatter {
        + getElementValue()
        + getClassElementValue()
        + format()
        + handleStringValue()
        + getArrayElementValue()
        + _init_()
        + getAnnotationElementValue()
        + getEnumElementValue()
        + getSimpleElementValue()
        + _clinit_()
        - logger
    }
    class AbstractAnnotationFormatter {
        + handleAnnotation()
        + _init_()
        + setAnnotationHandler()
        + checkHandleAnnotation()
        - annotationHandler
    }
    class DefaultAnnotationFormatter {
        + checkHandleAnnotation()
        + _init_()
        + handleAnnotation()
    }
    class HideAnnotationFormatter {
        + handleAnnotation()
        + _init_()
        + checkHandleAnnotation()
    }
    class SpringMvcRequestMappingFormatter {
        + getPathInRequestMappingAnnotation()
        + getSpringMvcPathFromAnnotation()
        + handleAnnotation()
        + getSpringMvcClassPath()
        + _init_()
        + checkHandleAnnotation()
        + _clinit_()
        + getPath()
        + doGetPathInRequestMappingAnnotation()
        - logger
    }
    class AnnotationAttributesParseUtil {
        + getSpringTxAnnotationPropagation()
        + parseListStringAttribute()
        + _init_()
        + genAnnotationAttribute()
        + getAttributeStringValue()
        + getAttributeValueFromMap()
        + parseFromFile()
        + _clinit_()
        + parseFromDb()
        - logger
    }
    class SpringTransactionalFormatter {
        + checkHandleAnnotation()
        + handleAnnotation()
        + _init_()
    }
    class AnnotationAttributesParseUtil_1 {
        + _init_()
    }
    class AnnotationAttributesParseUtil_2 {
        + _init_()
    }
    class AnnotationAttributesParseUtil_3 {
        + _init_()
    }
    class JACGJsonUtil {
        + _init_()
        + getObjFromJsonStr()
        + getMapFromJsonStr()
        + _clinit_()
        + getJsonStrPretty()
        + getObjFromJsonStr()
        + getJsonStr()
        - objectMapper
        - objectWriterPretty
        - logger
    }
    class JACGUtil {
        + containsCRLF()
        + getFirstExcludeSubString()
        + findStringInList()
        + _clinit_()
        + _init_()
        + checkPackageName()
        + replacePackage2DirPath()
        + genClassObject()
        + getSecondsFromMilli()
        + sleep()
        + getFirstLetterLowerClassName()
        + getMethodInStackTrace()
        + getInputRootPath()
        + addList2List()
        + getObjSimpleClassNameAndHash()
        + genHashWithLen()
        + genClassObject()
        + getArgAt()
        + getSpendSeconds()
        + wait4TPEExecute()
        + getListElement()
        - logger
    }
    class AnnotationHandler {
        + queryAnnotationAttributes4Class()
        + queryClassAnnotationByAnnotationAttribute()
        + queryAnnotationAttributes4Field()
        + lambda_genAnnotationMapFromQueryResult_0()
        + queryMethodAnnotationAttributes()
        + queryClassFieldsWithAnnotation()
        + queryFieldJsonPropertyValue()
        + genAnnotationAttributeMap()
        + queryAttribute4MethodArgAnnotation()
        + queryAnnotationMap4FullMethod()
        + queryAttribute4MethodAnnotation()
        + queryAnnotationMap4Class()
        + _init_()
        + queryClassesWithAnnotation()
        + querySpringTxAnnotationPropagation()
        + _init_()
        + queryMethodsAndHashWithAnnotation()
        + queryMethodsWithAnnotation()
        + queryMethodAnnotationAttributes()
        + genAnnotationMapFromQueryResult()
        + _clinit_()
        + querySuperClassesInfo()
        - ANNOTATION_ATTRIBUTE_COLUMNS
        - logger
        - jacgExtendsImplHandler
    }
    class BaseAnnotationAttribute {
        + _init_()
    }
    class JACGSpringUtil {
        + isRequestMappingAnnotation()
        + _init_()
        + isRequestMappingPathAttribute()
        + isControllerAnnotation()
        + genSpringControllerShowUri()
        + isTaskAnnotation()
    }
    class JACGCommonNameConstants {
        + _init_()
        + _clinit_()
        - JSON_PROPERTY_ANNOTATION_NAME_
        - SPRING_TASK_ANNOTATION
        - SPRING_COMMONS_MULTI_PART_FILE_CLASS
        - ANNOTATION_ATTRIBUTE_NAME_VALUE
        - SPRING_MULTI_PART_FILE_CLASS
        - MYBATIS_PARAM_ANNOTATION_NAME
        - SPRING_MVC_MAPPING_ATTRIBUTE_NAMES
        - STREAM_INTERMEDIATE_METHOD_NAMES
        - SPRING_TRANSACTION_TEMPLATE_CLASS
        - SPRING_MVC_CONTROLLER_ANNOTATIONS
        - STREAM_CLASS_NAMES
        - SPRING_TX_ATTRIBUTE_PROPAGATION
        - SPRING_MVC_MAPPING_ANNOTATIONS
        - SPRING_ASYNC_ANNOTATION
        - SPRING_TX_ANNOTATION
        - STREAM_TERMINAL_METHOD_NAMES
    }
    class ListStringAnnotationAttribute {
        + getAttributeList()
        + _init_()
        - attributeList
    }
    class StringAnnotationAttribute {
        + getAttributeString()
        + _init_()
        - attributeString
    }
    class AnnotationAttributeInfo {
        + _init_()
        + setAttributeType()
        + setAttributeValue()
        + _init_()
        + getAttributeType()
        + setAttributeName()
        + getAttributeName()
        + getAttributeValue()
        - attributeName
        - attributeValue
        - attributeType
    }
    class EmptyAnnotationAttribute {
        + _clinit_()
        + getInstance()
        + _init_()
        - INSTANCE
    }
AbstractAnnotationFormatter <|-- HideAnnotationFormatter
AbstractAnnotationFormatter <|-- SpringTransactionalFormatter
AbstractAnnotationFormatter <|-- DefaultAnnotationFormatter
AbstractAnnotationFormatter <|-- SpringMvcRequestMappingFormatter
BaseAnnotationAttribute <|-- StringAnnotationAttribute
BaseAnnotationAttribute <|-- EmptyAnnotationAttribute
BaseAnnotationAttribute <|-- ListStringAnnotationAttribute
AbstractAnnotationFormatter o-- AnnotationHandler`
onMounted(() => {
  mermaid.initialize({ startOnLoad: true });
  mermaid.init();
});


// ///////////////////

const mermaidDom = ref()



onMounted(() => {
  const container = mermaidDom.value;
  if (container) {
    // 初始化 panzoom
    const pz = panzoom(container, {
      maxZoom: 5,
      minZoom: 0.1,
      smoothScroll: true,
      bounds: true,
    }) as any;

    // 添加滚轮事件监听器，确保滚轮放大缩小时以鼠标为原点
    container.addEventListener('wheel', (e:any) => {
      e.preventDefault();
      pz.zoomToPoint(e, e.deltaY > 0 ? -0.1 : 0.1);
    });
  }
});
</script>
<style scoped></style>

