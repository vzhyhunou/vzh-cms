package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import vzh.cms.config.CmsProperties;
import vzh.cms.model.Base64File;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class FileService {

    private static final Base64.Decoder DECODER = Base64.getDecoder();
    private static final Base64.Encoder ENCODER = Base64.getEncoder();

    private final CmsProperties cmsProperties;

    private String path;

    @PostConstruct
    private void postConstruct() {
        path = cmsProperties.getFiles().getPath();
    }

    public void create(String location, Collection<Base64File> files) throws IOException {
        try {
            write(location, files);
        } catch (Exception e) {
            clean(location, Collections.emptySet());
            throw e;
        }
    }

    public void update(String oldLocation, String newLocation, Collection<Base64File> newFiles) throws IOException {

        //collect all files
        Collection<Base64File> oldFiles = read(oldLocation, true);

        //clean removed files
        clean(oldLocation, newFiles);

        //collect exist files
        Collection<Base64File> keepFiles = read(oldLocation, true);

        //clean exist files
        clean(oldLocation, Collections.emptySet());

        //add exist files
        newFiles.removeAll(keepFiles);
        newFiles.addAll(keepFiles);

        try {
            write(newLocation, newFiles);
        } catch (Exception e) {
            clean(newLocation, Collections.emptySet());
            write(oldLocation, oldFiles);
            throw e;
        }
    }

    public Collection<Base64File> read(String location, boolean addFiles) throws IOException {
        Path dir = Paths.get(path, location);
        Collection<Base64File> files = new HashSet<>();
        if (!Files.exists(dir)) {
            return files;
        }
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(dir)) {
            for (Path in : paths) {
                Base64File file = new Base64File();
                file.setName(in.getFileName().toString());
                if (addFiles) {
                    log.debug("Read: {}", in);
                    byte[] data = Files.readAllBytes(in);
                    file.setData(new String(ENCODER.encode(data)));
                }
                files.add(file);
            }
        }
        return files;
    }

    public void clean(String location, Collection<Base64File> files) throws IOException {
        Path dir = Paths.get(path, location);
        if (!Files.exists(dir)) {
            return;
        }
        Collection<String> names = files.stream().map(Base64File::getName).collect(Collectors.toSet());
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(dir)) {
            for (Path file : paths) {
                if (!names.contains(file.getFileName().toString())) {
                    Files.delete(file);
                }
            }
        }
        if (Objects.requireNonNull(dir.toFile().list()).length == 0) {
            Files.delete(dir);
        }
    }

    private void write(String location, Collection<Base64File> files) throws IOException {
        Path dir = Paths.get(path, location);
        for (Base64File file : files) {
            if (file.getData() != null) {
                Path out = Paths.get(dir.toString(), file.getName());
                log.debug("Write: {}", out);
                byte[] data = DECODER.decode(file.getData());
                Files.createDirectories(dir);
                Files.write(out, data);
            }
        }
    }
}
