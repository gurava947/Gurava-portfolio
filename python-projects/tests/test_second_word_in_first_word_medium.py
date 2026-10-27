import unittest

from support import run_solution


class SecondWordInFirstWordMediumTest(unittest.TestCase):
    def test_case_01_hello_and_world(self):
        """hello and world."""
        result = run_solution('second-word-in-first-word-medium', 'hello\nworld\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '4\n')

    def test_case_02_aaa_and_b(self):
        """aaa and b."""
        result = run_solution('second-word-in-first-word-medium', 'aaa\nb\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')

    def test_edge_01_empty_second_word(self):
        """Empty second word."""
        result = run_solution('second-word-in-first-word-medium', 'hello\n\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '-1\n')

    def test_edge_02_first_word_is_unused(self):
        """First word is unused."""
        result = run_solution('second-word-in-first-word-medium', 'this is a long first line\nx\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '0\n')


if __name__ == "__main__":
    unittest.main()
