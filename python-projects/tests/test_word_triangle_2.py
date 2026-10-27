import unittest

from support import run_solution


class WordTriangle2Test(unittest.TestCase):
    def test_case_01_hello(self):
        """hello."""
        result = run_solution('word-triangle-2', 'hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'hello\nhell\nhel\nhe\nh\n')

    def test_case_02_abc(self):
        """abc."""
        result = run_solution('word-triangle-2', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'abc\nab\na\n')


if __name__ == "__main__":
    unittest.main()
