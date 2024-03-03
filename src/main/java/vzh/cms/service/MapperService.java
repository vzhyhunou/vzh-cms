package vzh.cms.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import vzh.cms.model.Item;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
public class MapperService {

    private final ObjectMapper resourceMapper;

    private final ObjectMapper unlinkedMapper;

    public MapperService(@Qualifier("resourceObjectMapper") ObjectMapper resourceMapper,
                         @Qualifier("unlinkedObjectMapper") ObjectMapper unlinkedMapper) {
        this.resourceMapper = resourceMapper;
        this.unlinkedMapper = unlinkedMapper;
    }

    public Item resource(File file) throws IOException {
        log.debug("Read: {}", file);
        return resourceMapper.readValue(file, Wrapper.class).getItem();
    }

    public Item unlinked(File file) throws IOException {
        log.debug("Read: {}", file);
        return unlinkedMapper.readValue(file, Wrapper.class).getItem();
    }

    public void write(File file, Item item) throws IOException {
        log.debug("Write: {}", file);
        Files.createDirectories(file.getParentFile().toPath());
        Wrapper wrapper = new Wrapper();
        wrapper.setItem(item);
        resourceMapper.writeValue(file, wrapper);
    }

    @Data
    private static class Wrapper {
        @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.EXTERNAL_PROPERTY)
        private Item item;
    }
}
